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
        PROJECTNAME,
        CAST(YEARS AS INT) AS YEARS,
        TO_DATE(STARTDATE) AS STARTDATE,
        TO_DATE(ENDDATE) AS ENDDATE,
        PROJECTDESCRIPTION,
        SKILLSGAINED,
        MENTOR,
        CLIENT

    FROM {{ source('skillmatrix', 'projects') }}


)


SELECT * FROM required_fields