import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CartItem {
    productId: string;
    quantity: bigint;
}
export interface SupportMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
}
export interface UserProfile {
    displayName: string;
    email: string;
}
export interface Product {
    id: string;
    inStock: boolean;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    price: bigint;
}
export enum Category {
    plushie = "plushie",
    clothing = "clothing"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    addToCart(productId: string, quantity: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearCart(): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getAllSupportMessages(): Promise<Array<SupportMessage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCartContents(): Promise<Array<CartItem>>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeFromCart(productId: string): Promise<void>;
    removeProduct(productId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitSupportMessage(name: string, email: string, message: string): Promise<void>;
}
