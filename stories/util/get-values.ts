import { Aligment, Margin, Text } from "../../lib/types";

export const getTextValue = (align: string, margin: { x?: number, y?: number}, value: string): Text => ({
    align: align as Aligment,
    margin: margin as Margin,
    value,
});