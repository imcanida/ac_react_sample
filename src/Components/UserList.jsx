import React, { useContext, useState } from "react";
import { UserListContext } from "../ContextProviders/UserListContextProvider";
import {
  // Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonGroup,
  List,
} from "reactstrap";
import { AddUserModal } from "./AddUserModal";

export const UserList = () => {
  const { users, toggleUser, removeUser } = useContext(UserListContext);
  const [addUserModalActive, setUserModalActive] = useState(false);

  return (
    <>
      <div>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h1>User List - {users?.length ?? 0}</h1>
              </CardHeader>
              <CardBody>
                <Button
                  color="primary"
                  onClick={() => setUserModalActive(true)}
                >
                  Add User
                </Button>
                <ul>
                  {users.map((user, index) => (
                    <Row key={`user_list_item_${index}`} className="padding">
                      <Col>
                        <pre>{JSON.stringify(user, null, 2)}</pre>
                      </Col>
                      <Col>
                        <List
                          className={user.enabled ? "" : "userDisabled"}
                        >
                          {user.firstName} {user.lastName}
                        </List>
                      </Col>
                      <Col >
                        <ButtonGroup>
                          <Button
                            color={user.enabled ? "warning" : "info"}
                            onClick={() => toggleUser(user.id)}
                          >
                            {user.enabled ? "Disable" : "Enable"}
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => removeUser(user.id)}
                          >
                            Remove
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  ))}
                </ul>
                {addUserModalActive && (
                  <AddUserModal toggle={() => setUserModalActive(false)} />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
