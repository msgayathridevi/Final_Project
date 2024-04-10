WITH 
approved_employees AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_aprovers') }} 
    WHERE 
        status IN ('approved', 'denied')
),

employees_with_skills AS (
    SELECT
        emp._ID AS employee_id,
        app.status
    FROM
        approved_employees app
    JOIN
        {{ ref('stg_employees') }} emp
    ON
        app.approval = emp.name
    JOIN
        {{ ref('stg_skills') }} sk
    ON
        emp._ID = sk.USERID
)

SELECT
    status,
    CONCAT(COUNT(employee_id), '%') AS Percentage_Approved
FROM
    employees_with_skills
GROUP BY
    status
