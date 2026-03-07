import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Category = {
    #clothing;
    #plushie;
  };

  type Product = {
    id : Text;
    name : Text;
    description : Text;
    price : Nat; // Price in cents
    category : Category;
    imageUrl : Text;
    inStock : Bool;
  };

  type CartItem = {
    productId : Text;
    quantity : Nat;
  };

  type SupportMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
  };

  type UserProfile = {
    displayName : Text;
    email : Text;
  };

  let products = Map.empty<Text, Product>();
  let userCarts = Map.empty<Principal, List.List<CartItem>>();
  let supportMessages = Map.empty<Nat, SupportMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextSupportMessageId = 0;

  // Product Management
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func removeProduct(productId : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can remove products");
    };
    products.remove(productId);
  };

  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : Category) : async [Product] {
    let iter = products.values();
    let filtered = iter.filter(
      func(product) {
        product.category == category;
      }
    );
    filtered.toArray();
  };

  // Cart Management
  public shared ({ caller }) func addToCart(productId : Text, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add items to cart");
    };

    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) {
        if (not product.inStock) { Runtime.trap("Product is out of stock") };

        let cart = switch (userCarts.get(caller)) {
          case (null) { List.empty<CartItem>() };
          case (?existingCart) { existingCart };
        };

        let iter = cart.values();

        var hasProduct = false;
        iter.forEach(
          func(item) {
            if (item.productId == productId) {
              hasProduct := true;
            };
          }
        );

        let newCart = List.empty<CartItem>();

        iter.forEach(
          func(item) {
            if (item.productId == productId) {
              newCart.add({
                productId;
                quantity = item.quantity + quantity;
              });
            } else {
              newCart.add(item);
            };
          }
        );

        if (not hasProduct) {
          newCart.add({ productId; quantity });
        };

        userCarts.add(caller, newCart);
      };
    };
  };

  public shared ({ caller }) func removeFromCart(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove items from cart");
    };

    let cart = switch (userCarts.get(caller)) {
      case (null) { List.empty<CartItem>() };
      case (?existingCart) { existingCart };
    };

    let newCart = cart.filter(func(item) { item.productId != productId });
    userCarts.add(caller, newCart);
  };

  public query ({ caller }) func getCartContents() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view cart contents");
    };

    switch (userCarts.get(caller)) {
      case (null) { [] };
      case (?cart) { cart.toArray() };
    };
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };

    userCarts.add(caller, List.empty<CartItem>());
  };

  // Support Messages
  public shared ({ caller }) func submitSupportMessage(name : Text, email : Text, message : Text) : async () {
    let supportMessage = {
      id = nextSupportMessageId;
      name;
      email;
      message;
    };

    supportMessages.add(nextSupportMessageId, supportMessage);
    nextSupportMessageId += 1;
  };

  public query ({ caller }) func getAllSupportMessages() : async [SupportMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view support messages");
    };
    supportMessages.values().toArray();
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };
};
