
interface apiPopUp {
	title: string,
	message : string
}

export interface apiCallAction {
	url: string,
	method: "get" | "post" | "patch" | "put" | "delete",
	data ?: any,
	onSuccess ?: string,
	onError ?: string,
	onBegin ?: string,
	payload ?: any,
	popUpOnSuccess?: apiPopUp,
	payloadData ?: any
}
