# Developer Experience Demo

<div align="center">
<img src="./.assets/azure_logo.png" alt="Azure Logo" width="100" />
<img src="./.assets/github_logo.png" alt="GitHub Logo" width="100" />
</div>

This repo is used to demonstrate GitHub Advanced Security, GitHub CodeSpaces, GitHub Projects and Issues, and GitHub Actions.

## Setup

1. Create a new repo from this template.
1. [Enable Dependabot for your Repository](https://docs.github.com/en/code-security/getting-started/dependabot-quickstart-guide#enabling-dependabot-for-your-repository)
2. Set up a project board using the team template.
    - Add the following issues and add them to the board
      - Delete an order
        ```
        As a user,
        I want to delete an order,
        So that I can remove an order entered in error.
        
        Acceptance Criteria:
        - DELETE /orders/[id] should delete an order from the database and return a 200
        - If there is no order with that ID, return a 404 Not Found
        ```
      - Create an order
        ```
        As a user,
        I want to create a new order,
        So that I can purchase something.
        
        Acceptance Criteria:
        - POST /orders with the following body should create a new order and return a 201 with the order, including the Id
        ```
1. Turn on branch protection for main
    - Require a PR before merging
    - Require one approval before merging
  
