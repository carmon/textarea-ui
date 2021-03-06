export interface LayerProps {
    value: string;
    style?: any; // just for now
    width: number;
    height: number;
}

export interface InputProps extends LayerProps {
    onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}