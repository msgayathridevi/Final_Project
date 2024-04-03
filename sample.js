exports.editSkill = async (req, res) => {
  try {
    const { email, skillMode, skills, rateYourself, driveLink } = req.body;
    const userId = req.params.userId;
    // console.log("userID in cbackend : "+ userId);

    // Check if the skill exists
    let existingSkill = await SkillModel.findOne({ userId });

    if (!existingSkill) {
      // If skill does not exist, create a new one
      existingSkill = new SkillModel({
        email,
        userId,
        skillMode,
        skills,
        rateYourself,
        driveLink
      });
    } else {
      // If skill exists, update it with the new data
      existingSkill.skillMode = skillMode;
      existingSkill.skills = skills;
      existingSkill.rateYourself = rateYourself;
      existingSkill.driveLink = driveLink;
    }

    // Save the skill to the database
    await existingSkill.save();

    return res.status(200).json({ message: 'Skill updated successfully' });
  } catch (error) {
    console.error('Error updating skill:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};