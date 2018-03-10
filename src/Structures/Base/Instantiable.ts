export default interface Instantiable {
    new(...args: any[]): this;
}