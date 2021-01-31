export type Theme = {
  surface: string;
  foreground: string;
  primary: {
    surface: string;
    foreground: string;
  };
  accent: {
    surface: string;
    foreground: string;
  };
  warning: {
    surface: string;
    foreground: string;
  };
};

export type ThemeColorOptions = {
  primary?: boolean;
  accent?: boolean;
  warning?: boolean;
};
