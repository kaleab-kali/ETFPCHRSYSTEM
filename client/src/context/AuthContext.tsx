import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  role: string;
  token: string;
  type: "employee" | "hrstaffs";
  employeeId: string;
  ObjId: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    token: string,
    role: string,
    type: "employee" | "hrstaffs",
    employeeId: string,
    ObjId: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    // Set user state from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (
    token: string,
    role: string,
    type: "employee" | "hrstaffs",
    employeeId: string,
    ObjId: string
  ) => {
    const newUser = { token, role, type, employeeId, ObjId };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
