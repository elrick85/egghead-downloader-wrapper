/**
 * Created by zauri_000 on 20.03.2017.
 */

export interface ITypeItem {
    id: number;
    name: string;
}

export class OptionsDataProvider{
    getOptions(): Promise<ITypeItem[]> {
        return Promise.resolve([
            {id: 1, name: "Dropbox.com"} as ITypeItem,
            {id: 2, name: "Box.com"} as ITypeItem,
            {id: 3, name: "OneDrive"} as ITypeItem,
            {id: 4, name: "GoogleDrive"} as ITypeItem,
        ]);
    }
}