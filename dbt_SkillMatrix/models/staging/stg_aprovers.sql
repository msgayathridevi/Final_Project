{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (

    SELECT
    
        *

    FROM {{ source('skillmatrix', 'aprovers') }}

)


SELECT * FROM required_fields