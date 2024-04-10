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

stg_skills AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_skills') }} 
),

stg_employees AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_employees') }} 
),

-- Count the number of employees for each skill
employee_skill_count AS (
    SELECT
        sk.SKILLS AS skill_name,
        COUNT(DISTINCT emp._ID) AS employee_count
    FROM
        stg_skills sk
    JOIN
        stg_employees emp
    ON
        sk.USERID = emp._ID
    GROUP BY
        sk.SKILLS
),

-- Rank skills based on the number of employees
ranked_skills AS (
    SELECT
        skill_name,
        employee_count,
        ROW_NUMBER() OVER (ORDER BY employee_count DESC) AS skill_rank
    FROM
        employee_skill_count
)

-- Select the top 10 skills with the highest number of employees
SELECT
    skill_name,
    employee_count
FROM
    ranked_skills
WHERE
    skill_rank <= 10
ORDER BY
    employee_count DESC
