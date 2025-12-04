import { createContext } from "react";
import type { User } from "../Types/users.types";

export interface Book {
  book_id: number;
  title: string;
  author: string;
  category_id: number | null;
  publication_year: number | null;
  stock_quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface appInterface {
  collapse: boolean;
  sideActive: number;
  selectActive: boolean;
  period: string;
  isAuthenticated: boolean;
  profilePop: boolean;
  theme: 'light' | 'dark';
  mobileMenuOpen: boolean;
  alertPop: boolean;
  deletedBook: Book[];
  deleteApprove:boolean;
  bookSearchIdActive:boolean;
  book:Book[];
  profileInfo:User[],
  setProfileInfo:(user:User[])=>void;
  setBook:(book:Book[])=>void;
  setBookSearchIdActive:(prev:boolean)=>void;
  setDeleteApprove:(prev:boolean)=>void;
  setDeleteBook: (book: Book[]) => void;
  setAlertPop: (prev: boolean) => void;
  setPeriod: (period: string) => void;
  setSelectActive: (q: boolean) => void;
  setSideActive: (q: number) => void;
  setCollapse: (prev: boolean) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setMobileMenuOpen: (open: boolean) => void;
  setProfilePop: (pop: boolean) => void;
}

const appContext = createContext<appInterface>({
  collapse: false,
  selectActive: false,
  profilePop: false,
  alertPop: false,
  period: localStorage.getItem("period") || "",
  isAuthenticated: !!localStorage.getItem("currentUser"),
  theme: (localStorage.getItem("theme") as 'light' | 'dark') || 'light',
  mobileMenuOpen: false,
  deletedBook: [] as Book[],
  deleteApprove:false,
  bookSearchIdActive:false,
  book:[] as Book[],
  profileInfo: [] as User[],

  setProfileInfo:()=>{},
  setBook:()=>{},
  setBookSearchIdActive:()=>{},
  setDeleteApprove:()=>{},
  setDeleteBook: () => {},
  setAlertPop: () => {},
  setProfilePop: () => {},
  setPeriod: () => {},
  setSelectActive: () => {},
  sideActive: Number(localStorage.getItem("sideActive")) || 0,
  setCollapse: () => {},
  setSideActive: () => {},
  setIsAuthenticated: () => {},
  setTheme: () => {},
  setMobileMenuOpen: () => {},
});

export default appContext;
