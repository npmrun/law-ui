
export interface IDialogState {
	visible: boolean;
	props?: any;
	dialogProps?: any;
	argus?: any;
}
export interface IDialogAction {
	show: Function;
	hide: Function;
}

export type DialogExpose = [IDialogState, IDialogAction];
