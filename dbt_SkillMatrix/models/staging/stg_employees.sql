{{
    config(
        tags=['basic', 'staging']
    )
}}


WITH

required_fields AS (

    SELECT

	_ID ,
	NAME ,
	EMAIL ,
	PASSWORD ,
	ROLE ,
	CAST(AGE as INT) ,
	PHONENUMBER ,
	DESIGNATION ,
	DEPARTMENT ,
	ISAPPROVER 

    FROM {{ source('skillmatrix', 'employees') }}

)


SELECT * FROM required_fields