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

stg_aprovers AS ( 
    SELECT 
        *
    FROM 
        {{ ref('stg_aprovers') }} 
)

SELECT 
    e._ID,
    e.name,
    e.email,
    e.designation,
    a.approver,
    a.approval,
    a.status,
    a.SKILLS,
    c.organization,
    c.durationinweeks,
    p.projectname,
    p.years,
    p.skillsgained,
    p.mentor,
    p.client,
    s.skillmode

FROM 
    stg_employees e
join 
    stg_aprovers a
on 
    e.name = a.approver
join
    stg_certificates c
on 
    e._ID=c.USERID
join
    stg_projects p
on 
    e._id=p.USERID
join
    stg_skills s
on 
    e._ID=s.USERID
