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

employees_certificates AS (
    SELECT 
       
        cer.organization
    FROM
        stg_employees emp
    JOIN  
        stg_certificates cer
    ON 
        cer.USERID = emp._ID
)

SELECT 
    organization,
    COUNT(*) AS certificate_count
FROM 
    employees_certificates
GROUP BY 
    organization
ORDER BY 
    certificate_count DESC
LIMIT 
    10