declare const getStyle: (style: "message" | "button" | "link" | "icon" | "banner") => {
    background: string;
    border: string;
    boxShadow: string;
    padding: string;
    position: string;
    fontSize: string;
    top: string;
    marginTop: string;
    right: string;
    color: string;
    cursor: string;
} | {
    color: string;
    textDecoration: string;
    marginLeft: string;
} | {
    position: string;
    top: string;
    right: string;
    lineHeight: string;
    marginTop: string;
    padding: string;
    backgroundColor: string;
    border: string;
    borderRadius: string;
    boxShadow: string;
    fontSize: string;
    fontWeight: string;
    color: string;
    cursor: string;
} | {
    lineHeight: string;
    fontWeight: number;
    color: string;
} | {
    position: string;
    textAlign: string;
    backgroundColor: string;
    width: string;
    height: string;
    zIndex: string;
};
export { getStyle };
