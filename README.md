# Postgraphile Debug


## Description

When using the `computed columns` there is a strange behavior with the additional parameters and the type `tsrange` from postgres.
Note that the errors do not show when testing the functions directly against the database but it only appears when running the graphql queries.

The following code snippets comes from the migrations in the `flyway` folder.

In this code snippet, you can see that we have a custom type `to space.launch_pad` as a second parameter. Even if it's not used it's not the problem here.

```SQL
CREATE OR REPLACE FUNCTION space.spacecraft_eta(
    spacecraft space.spacecraft,
    "to" space.launch_pad
) RETURNS TSRANGE LANGUAGE plpgsql STABLE 
AS $$
BEGIN
    RETURN $1.return_to_earth;
END $$;
```

When running the following query, you can see that the eta column will be incorrect.
Note that it's note the same error we face depending on the tsrange value.

A value like: `["2024-03-21 00:00:00","2024-03-22 23:59:59"]` where `[]` would take the upper bound and set is as the lower bound of the result   
A value like: `["2024-03-20 00:00:00","2024-03-23 00:00:00")` where `[)` would completely fail

```graphql
query {
  allSpacecrafts {
    nodes {
      id
      name
      eta(to: { id: "1", type: MOBILE }) {
        start {
          value
        }
        end {
          value
        }
      }
    }
  }
}
```

Running the exact same query without the parameter works fine
```graphql
query {
  allSpacecrafts {
    nodes {
      id
      name
      eta {
        start {
          value
        }
        end {
          value
        }
      }
    }
  }
}
```


The probleme seems to appears when using a "custom type" as a parameter.


## Get it started

### Devcontainer
Clone inside the dev container and every thing should be ready to run.

You can then run it by running 

```bash
npm start
```

### Without dev container

You can take the scripts from the folder `flyway` and execute them manually against your DB.

You can then run it by running 

```bash
npm install
npm start
```
