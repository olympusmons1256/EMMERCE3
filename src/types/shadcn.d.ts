import React from 'react';

declare module "@/components/ui/card" {
  export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module "@/components/ui/input" {
  export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
}

declare module "@/components/ui/label" {
  export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>>;
}

declare module "@/components/ui/button" {
  export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    size?: string;
    asChild?: boolean;
  }>;
}

declare module "@/components/ui/checkbox" {
  export const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
    onCheckedChange?: (checked: boolean) => void;
  }>;
}

declare module "@/components/ui/textarea" {
  export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
}

declare module "@/components/ui/badge" {
  export const Badge: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    variant?: string;
  }>;
}