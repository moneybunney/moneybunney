import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";

import { IAccount } from "../../Models/AccountModel";
import { ICategory } from "../../Models/TransactionModel";

import {
  emptyFilterObject,
  IFilterItems,
  IFilters
} from "../../Models/TransactionFilterModel";
import { getAccounts } from "../../Utilities/Api";
import CreateTransactionButton from "./CreateTransactionButton";
import TransactionFilter from "./TransactionFilter";
import TransactionListContainer from "./TransactionListContainer";

const useStyles = makeStyles((theme: Theme) => ({
  createFab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 10
  },
  filterFab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 20
  }
}));

const hardcodedCategories = ["Beer", "Wine", "Other"].map(
  (item, index): ICategory => ({ id: index, text: item })
);

const TransactionView = () => {
  const classes = useStyles();

  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const filterItems: IFilterItems = {
    accounts: accounts.map(({ id, name }) => ({
      key: id.toString(),
      value: name
    })),
    categories: categories.map(({ id, text }) => ({
      key: id.toString(),
      value: text
    })),
    transactionTypes: ["Expense", "Income", "Transfer"].map(item => ({
      key: item,
      value: item
    })),
    tags: ["foo", "bar", "baz", "bez", "booze", "bamboozle"].map(item => ({
      key: item,
      value: item
    }))
  };

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
      setCategories(hardcodedCategories);
    })();
  }, []);

  return (
    <>
      <TransactionListContainer
        filters={filters}
        accounts={accounts}
        categories={categories}
      />
      <CreateTransactionButton className={classes.createFab} />
      <TransactionFilter
        className={classes.filterFab}
        setFilters={setFilters}
        filters={filters}
        items={filterItems}
      />
    </>
  );
};

export default TransactionView;
