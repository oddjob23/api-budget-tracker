const tree = {
  "path": "./",
  "name": "api-budget-app",
  "children": [
    {
      "path": "docker-compose.yml",
      "name": "docker-compose.yml",
      "size": 123,
      "extension": ".yml",
      "type": "file"
    },
    {
      "path": "package-lock.json",
      "name": "package-lock.json",
      "size": 393643,
      "extension": ".json",
      "type": "file"
    },
    {
      "path": "package.json",
      "name": "package.json",
      "size": 1175,
      "extension": ".json",
      "type": "file"
    },
    {
      "path": "src",
      "name": "src",
      "children": [
        {
          "path": "src\\controllers",
          "name": "controllers",
          "children": [
            {
              "path": "src\\controllers\\auth",
              "name": "auth",
              "children": [
                {
                  "path": "src\\controllers\\auth\\auth.controller.ts",
                  "name": "auth.controller.ts",
                  "size": 2462,
                  "extension": ".ts",
                  "type": "file"
                },
                {
                  "path": "src\\controllers\\auth\\__test__",
                  "name": "__test__",
                  "children": [
                    {
                      "path": "src\\controllers\\auth\\__test__\\register.test.ts",
                      "name": "register.test.ts",
                      "size": 3332,
                      "extension": ".ts",
                      "type": "file"
                    },
                    {
                      "path": "src\\controllers\\auth\\__test__\\signin.test.ts",
                      "name": "signin.test.ts",
                      "size": 2608,
                      "extension": ".ts",
                      "type": "file"
                    }
                  ],
                  "size": 5940,
                  "type": "directory"
                }
              ],
              "size": 8402,
              "type": "directory"
            },
            {
              "path": "src\\controllers\\transactions",
              "name": "transactions",
              "children": [
                {
                  "path": "src\\controllers\\transactions\\transaction.controller.ts",
                  "name": "transaction.controller.ts",
                  "size": 1547,
                  "extension": ".ts",
                  "type": "file"
                },
                {
                  "path": "src\\controllers\\transactions\\__test__",
                  "name": "__test__",
                  "children": [
                    {
                      "path": "src\\controllers\\transactions\\__test__\\transaction-create.test.ts",
                      "name": "transaction-create.test.ts",
                      "size": 1911,
                      "extension": ".ts",
                      "type": "file"
                    }
                  ],
                  "size": 1911,
                  "type": "directory"
                }
              ],
              "size": 3458,
              "type": "directory"
            }
          ],
          "size": 11860,
          "type": "directory"
        },
        {
          "path": "src\\errors",
          "name": "errors",
          "children": [
            {
              "path": "src\\errors\\BadRequestError.ts",
              "name": "BadRequestError.ts",
              "size": 311,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\errors\\BaseError.ts",
              "name": "BaseError.ts",
              "size": 274,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\errors\\DatabaseConnectionError.ts",
              "name": "DatabaseConnectionError.ts",
              "size": 412,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\errors\\NotAuthorizedError.ts",
              "name": "NotAuthorizedError.ts",
              "size": 349,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\errors\\NotFoundError.ts",
              "name": "NotFoundError.ts",
              "size": 306,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\errors\\RequestValidationError.ts",
              "name": "RequestValidationError.ts",
              "size": 520,
              "extension": ".ts",
              "type": "file"
            }
          ],
          "size": 2172,
          "type": "directory"
        },
        {
          "path": "src\\index.ts",
          "name": "index.ts",
          "size": 795,
          "extension": ".ts",
          "type": "file"
        },
        {
          "path": "src\\middlewares",
          "name": "middlewares",
          "children": [
            {
              "path": "src\\middlewares\\CurrentUser.ts",
              "name": "CurrentUser.ts",
              "size": 893,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\middlewares\\ErrorHandler.ts",
              "name": "ErrorHandler.ts",
              "size": 454,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\middlewares\\RequireAuth.ts",
              "name": "RequireAuth.ts",
              "size": 302,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\middlewares\\ValidateRequest.ts",
              "name": "ValidateRequest.ts",
              "size": 438,
              "extension": ".ts",
              "type": "file"
            }
          ],
          "size": 2087,
          "type": "directory"
        },
        {
          "path": "src\\migrations",
          "name": "migrations",
          "children": [],
          "size": 0,
          "type": "directory"
        },
        {
          "path": "src\\models",
          "name": "models",
          "children": [
            {
              "path": "src\\models\\transaction",
              "name": "transaction",
              "children": [
                {
                  "path": "src\\models\\transaction\\transaction.ts",
                  "name": "transaction.ts",
                  "size": 1212,
                  "extension": ".ts",
                  "type": "file"
                }
              ],
              "size": 1212,
              "type": "directory"
            },
            {
              "path": "src\\models\\user",
              "name": "user",
              "children": [
                {
                  "path": "src\\models\\user\\user.ts",
                  "name": "user.ts",
                  "size": 1008,
                  "extension": ".ts",
                  "type": "file"
                },
                {
                  "path": "src\\models\\user\\utils.ts",
                  "name": "utils.ts",
                  "size": 1092,
                  "extension": ".ts",
                  "type": "file"
                }
              ],
              "size": 2100,
              "type": "directory"
            }
          ],
          "size": 3312,
          "type": "directory"
        },
        {
          "path": "src\\server.ts",
          "name": "server.ts",
          "size": 972,
          "extension": ".ts",
          "type": "file"
        },
        {
          "path": "src\\test",
          "name": "test",
          "children": [
            {
              "path": "src\\test\\setup.ts",
              "name": "setup.ts",
              "size": 643,
              "extension": ".ts",
              "type": "file"
            },
            {
              "path": "src\\test\\utils.ts",
              "name": "utils.ts",
              "size": 392,
              "extension": ".ts",
              "type": "file"
            }
          ],
          "size": 1035,
          "type": "directory"
        }
      ],
      "size": 22233,
      "type": "directory"
    },
    {
      "path": "tsconfig.json",
      "name": "tsconfig.json",
      "size": 11401,
      "extension": ".json",
      "type": "file"
    },
    {
      "path": "READMEexample",
      "name": "READMEexample",
      "type": "file"
    }
  ],
  "size": 428575,
  "type": "directory"
}
  export { tree }