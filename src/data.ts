import burger from "./assets/burger.jpg";
import pizza from "./assets/pizza.jpg";
import biryani from "./assets/biryani.jpg";
import pasta from "./assets/pasta.jpg";
import sushi from "./assets/sushi.jpg";
import dessert from "./assets/dessert.jpg";
import drink from "./assets/drink.jpg";
import scooter from "./assets/scooter.jpg";

export const img = { burger, pizza, biryani, pasta, sushi, dessert, drink, scooter };

export type Category = "Pizza" | "Burger" | "Biryani" | "Pasta" | "Sushi" | "Desserts" | "Drinks";

export const categories: { name: Category; img: string }[] = [
  { name: "Pizza", img: pizza },
  { name: "Burger", img: burger },
  { name: "Biryani", img: biryani },
  { name: "Pasta", img: pasta },
  { name: "Sushi", img: sushi },
  { name: "Desserts", img: dessert },
  { name: "Drinks", img: drink },
];

export interface Dish {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  tag: string;
  tagColor: "pink" | "amber" | "violet" | "green";
  cat: Category;
  rating: number;
  time: string;
}

export const dishes: Dish[] = [
  { id: 1, name: "Margherita Pizza", desc: "Classic delight with 100% real mozzarella cheese.", price: 12.49, img: pizza, tag: "Bestseller", tagColor: "pink", cat: "Pizza", rating: 4.8, time: "25 min" },
  { id: 2, name: "Chicken Biryani", desc: "Aromatic basmati rice cooked with juicy chicken.", price: 9.99, img: biryani, tag: "Spicy", tagColor: "amber", cat: "Biryani", rating: 4.7, time: "30 min" },
  { id: 3, name: "Cheese Burger", desc: "Loaded with cheese, veggies & our special sauce.", price: 8.99, img: burger, tag: "Popular", tagColor: "amber", cat: "Burger", rating: 4.9, time: "20 min" },
  { id: 4, name: "Alfredo Pasta", desc: "Creamy white sauce pasta with herbs & mushrooms.", price: 10.99, img: pasta, tag: "New", tagColor: "violet", cat: "Pasta", rating: 4.6, time: "25 min" },
  { id: 5, name: "Dragon Sushi Platter", desc: "Fresh rolls & nigiri with wasabi and pickled ginger.", price: 15.99, img: sushi, tag: "Chef's Pick", tagColor: "pink", cat: "Sushi", rating: 4.8, time: "35 min" },
  { id: 6, name: "Choco Berry Cupcake", desc: "Velvety chocolate sponge, strawberry cream topping.", price: 4.99, img: dessert, tag: "Sweet", tagColor: "pink", cat: "Desserts", rating: 4.9, time: "15 min" },
  { id: 7, name: "Coca Cola (1L)", desc: "Ice-cold, extra fizzy. Served with lemon & ice.", price: 3.49, img: drink, tag: "Cold", tagColor: "green", cat: "Drinks", rating: 4.5, time: "10 min" },
  { id: 8, name: "Pepperoni Inferno", desc: "Double pepperoni, chilli flakes and hot honey drizzle.", price: 14.49, img: pizza, tag: "Hot", tagColor: "amber", cat: "Pizza", rating: 4.8, time: "28 min" },
  { id: 9, name: "Double Smash Burger", desc: "Two smashed patties, cheddar, pickles, secret sauce.", price: 11.99, img: burger, tag: "Bestseller", tagColor: "pink", cat: "Burger", rating: 4.9, time: "22 min" },
  { id: 10, name: "Hyderabadi Dum Biryani", desc: "Slow-cooked layered rice with saffron and spices.", price: 11.49, img: biryani, tag: "Chef's Pick", tagColor: "violet", cat: "Biryani", rating: 4.7, time: "35 min" },
];
