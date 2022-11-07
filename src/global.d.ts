declare module "*.css"
declare module "*.scss"



/**
 * Global Window interface declaration
 * in order to use custom API from preload.ts file 
*/
declare interface Window {
    electron: {
        store: {
            get: (key: string) => any;
            set: (key: string, val: any) => void;
            // any other methods you've defined...
        };
    };
}
