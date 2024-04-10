{{
    config(
        tags=['basic', 'mart']
    )
}}

WITH 
stg_projects AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_projects') }} 
),

stg_employees AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_employees') }} 
),

-- Count the number of projects each employee worked on
employee_project_count AS (
    SELECT
        emp._ID AS employee_id,
        emp.name AS employee_name,
        pro.PROJECTNAME AS project_name,
        COUNT(*) AS project_count
    FROM
        stg_employees emp
    JOIN
        stg_projects pro
    ON
        emp._ID = pro.USERID
    GROUP BY
        emp._ID, emp.name, pro.PROJECTNAME
),

-- Rank employees based on the number of projects worked on
ranked_employees AS (
    SELECT
        employee_id,
        employee_name,
        project_name,
        project_count,
        ROW_NUMBER() OVER (PARTITION BY project_name ORDER BY project_count DESC) AS employee_rank
    FROM
        employee_project_count
)

-- Select the employee who worked the most on each project
SELECT
    employee_id,
    employee_name,
    project_name
FROM
    ranked_employees
WHERE
    employee_rank = 1
