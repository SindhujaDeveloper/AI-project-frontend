
export interface ICustomSearchProps {
	data: Array<Record<string, string>>;
	setData: React.Dispatch<React.SetStateAction<Array<Record<string, string>>>>;
	searchKey: string;
}

export interface IModalProps {
	show: boolean;
	handleClose: () => void
}
