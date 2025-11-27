import appContext from "./AppContext";
import { useState } from "react";
import type { FC, ReactNode } from "react";

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

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const [sideActive, setSideActive] = useState(
    Number(localStorage.getItem("sideActive")) || 0
  );

  const [selectActive, setSelectActive] = useState(false);

  const [period, setPeriod] = useState(localStorage.getItem("period") || "");

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("currentUser")
  );

  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePop, setProfilePop] = useState(false);
  const [alertPop, setAlertPop] = useState(false);

  // Correct: array of Book
  const [deletedBook, setDeleteBook] = useState<Book[]>([]);
  const [deleteApprove,setDeleteApprove]=useState(false)
  const value = {
    profilePop,
    collapse,
    period,
    sideActive,
    selectActive,
    isAuthenticated,
    theme,
    mobileMenuOpen,
    alertPop,
    deletedBook,
    deleteApprove,

    setDeleteApprove,
    setDeleteBook,
    setAlertPop,
    setProfilePop,
    setPeriod,
    setSelectActive,
    setSideActive,
    setCollapse,
    setIsAuthenticated,
    setTheme,
    setMobileMenuOpen,
  };

  return (
    <appContext.Provider value={value}>
      {children}
    </appContext.Provider>
  );
};
