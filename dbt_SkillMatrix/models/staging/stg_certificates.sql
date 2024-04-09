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
        CREDENTIALSID ,
        DRIVELINK ,
        ORGANIZATION ,
        CONVERT(date, EXPIREDATE) ,
        CONVERT(date, ISSUEDATE) ,
        CAST(DURATIONINWEEKS as INT) ,
        SKILLS 

    FROM {{ source('skillmatrix', 'certificates') }}

)


SELECT * FROM required_fields