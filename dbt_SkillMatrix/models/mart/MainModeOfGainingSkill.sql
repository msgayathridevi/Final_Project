{{
    config(
        tags=['basic', 'mart']
    )
}}

WITH 

stg_employees AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_employees') }} 
),
stg_projects AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_projects') }} 
),


stg_skills AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_skills') }} 
),

stg_certificates AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_certificates') }} 
),

-- employees_certificates AS (
--     SELECT
--         ae.*,
--         c.USERID,
--         c.ORGANIZATION,
--         c.SKILLS
--     FROM
--         {{ ref('stg_certificates') }} c
--     JOIN 
--         approved_employees ae
--     ON 
--         c.USERID = ae.EMPLOYEE_ID
-- )

employees_certificates AS (
    SELECT 
        emp._ID, cer.USERID
    FROM
        stg_employees emp
        join  stg_certificates cer
        on cer.USERID=emp._ID
)

SELECT * FROM employees_certificates