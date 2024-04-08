{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (

    SELECT
    
        *

    FROM {{ source('skillmatrix', 'employees') }}

)


SELECT * FROM required_fields