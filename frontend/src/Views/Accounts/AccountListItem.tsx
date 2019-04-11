import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useReactRouter from "use-react-router";
import BalanceAmountText from "../../Components/BalanceAmountText";
import { IAccount } from "../../Models/AccountModel";

const useStyles = makeStyles((theme: Theme) => ({}));

interface IProps {
  account: IAccount;
}

const AccountListItem = ({ account }: IProps) => {
  const classes = useStyles();
  const { history } = useReactRouter();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(`/transactions?account=${account.name}`);
  };

  return (
    <ListItem button={true} onClick={onClick}>
      <ListItemText primary={account.name} />
      <ListItemSecondaryAction>
        <BalanceAmountText
          amount={account.startingBalance}
          difference={false}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default AccountListItem;