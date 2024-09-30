declare module 'react-native-table-component' {
  import { ComponentType, ReactNode } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  interface TableProps {
    borderStyle?: ViewStyle;
    children?: ReactNode;  // Adicionando children
    style?: ViewStyle;      // Adicionando style
  }

  interface RowProps {
    data: any[];
    style?: ViewStyle;
    textStyle?: TextStyle;
    flexArr?: number[];     // Adicionando flexArr
  }

  interface RowsProps {
    data: any[][];
    style?: ViewStyle;
    textStyle?: TextStyle;
  }

  export const Table: ComponentType<TableProps>;
  export const Row: ComponentType<RowProps>;
  export const Rows: ComponentType<RowsProps>;
}
