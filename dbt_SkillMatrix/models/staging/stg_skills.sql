{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (

    SELECT
    
        _ID ,
        USERID ,
        SKILLMODE ,
        SKILLS ,
        CASR(RATEYOURSELF as INT) ,
        DRIVELINK 

    FROM {{ source('skillmatrix', 'skills') }}

)


SELECT * FROM required_fields