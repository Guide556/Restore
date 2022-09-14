import { Container, ButtonGroup, Button, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import agent from "../../app/api/agent";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then(() => console.log('should not see this'))
      .catch(error => setValidationErrors(error));
  }

  return (
    <Container sx={{ mt: 2 }}>
      <ButtonGroup variant="contained" fullWidth>
        <Button onClick={() => agent.TestErrors.get400Error()}>Test 400 Errors</Button>
        <Button onClick={() => agent.TestErrors.get401Error()}>Test 401 Errors</Button>
        <Button onClick={() => agent.TestErrors.get404Error()}>Test 404 Errors</Button>
        <Button onClick={() => agent.TestErrors.get500Error()}>Test 500 Errors</Button>
        <Button onClick={() => agent.TestErrors.getValidationError().catch(err => console.log(err))}>Test getValidation Errors</Button>
        <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
      </ButtonGroup>

      {validationErrors.length > 0 &&
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map(error => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      }

    </Container>
  )
}