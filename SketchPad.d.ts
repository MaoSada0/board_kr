import React from 'react';
import Tool, { ToolOption, Position } from './enums/Tool';
import { Stroke } from './StrokeTool';
import { Shape } from './ShapeTool';
import { Image } from './ImageTool';
import { Text } from './TextTool';
import './SketchPad.less';
export interface SketchPadProps {
    currentTool: Tool;
    setCurrentTool: (tool: Tool) => void;
    currentToolOption: ToolOption;
    userId: string;
    operations?: Operation[];
    onChange?: onChangeCallback;
    viewMatrix: ViewMatrix;
    onViewMatrixChange: (viewMatrix: ViewMatrix) => void;
}
export type onChangeCallback = (newOperaton: Operation, operationsAfter: Operation[]) => void;
export type onSaveCallback = (image: {
    canvas: HTMLCanvasElement;
    dataUrl: string;
}) => void;
export type SketchPadRef = {
    selectImage: (image: string) => void;
    undo: () => void;
    redo: () => void;
    clear: () => void;
    save: (handleSave?: onSaveCallback) => void;
};
export type Remove = {
    operationId: string;
};
export type Operation = (Stroke | Shape | Text | Image | Update | Remove) & {
    id: string;
    userId: string;
    timestamp: number;
    pos: Position;
    tool: Tool;
};
export type Update = {
    operationId: string;
    data: Partial<(Stroke | Shape | Text | Image) & {
        pos: Position;
    }>;
};
export type OperationListState = {
    queue: Operation[];
    reduced: Operation[];
};
export type ViewMatrix = [number, number, number, number, number, number];
declare const _default: React.ForwardRefExoticComponent<SketchPadProps & React.RefAttributes<any>>;
export default _default;
