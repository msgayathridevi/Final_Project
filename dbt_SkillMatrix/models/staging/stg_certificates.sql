{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (

    SELECT

        _ID,
        USERID,
        CREDENTIALSID,
        DRIVELINK,
        ORGANIZATION,
        TO_DATE(EXPIREDATE) AS EXPIREDATE,
        TO_DATE(ISSUEDATE) AS ISSUEDATE,
        CAST(DURATIONINWEEKS AS INT) AS DURATIONINWEEKS,
        SKILLS

    FROM {{ source('skillmatrix', 'certificates') }}

)


SELECT * FROM required_fields