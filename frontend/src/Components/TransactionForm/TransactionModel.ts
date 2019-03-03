export default interface ITransaction {
    date: string;
    account: string;
    category: string;
    price: string;
    description: string;
    tags: string[];
}

export const createEmptyTransaction = (): ITransaction => ({
    account: "",
    category: "",
    date: getNowDate(),
    description: "",
    price: "",
    tags: [""],
  });

export const getNowDate = () => {
    const pad = (s: number) => String(s).length < 2 ? "0" + s : s;
    const d = new Date();
    const month = pad(d.getMonth());
    const day = pad(d.getDate());
    const date = d.getFullYear() + "-" + month + "-" + day;
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const time = hours + ":" + minutes;
    return date + "T" + time;
};
