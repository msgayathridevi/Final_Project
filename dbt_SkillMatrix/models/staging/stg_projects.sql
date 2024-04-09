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
        PROJECTNAME ,
        CAST(YEARS as INT) ,
        CONVERT(date, STARTDATE) ,
        CONVERT(date, ENDDATE),
        PROJECTDESCRIPTION ,
        SKILLSGAINED ,
        MENTOR ,
        CLIENT 

    FROM {{ source('skillmatrix', 'projects') }}

)


SELECT * FROM required_fields