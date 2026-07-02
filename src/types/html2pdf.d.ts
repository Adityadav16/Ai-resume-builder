declare module 'html2pdf.js' {
    interface Html2Pdf {
        set(options: any): Html2Pdf;
        from(element: HTMLElement | string): Html2Pdf;
        save(): Promise<void>;
    }
    function html2pdf(): Html2Pdf;
    export default html2pdf;
}
