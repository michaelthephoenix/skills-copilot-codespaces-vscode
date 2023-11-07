function skillsMember() {
    if (member.skills && Array.isArray(member.skills)) {
        member.skills.forEach(skill => {
            console.log(skill);
        });
    } else {
        console.log('No skills found for this member.');
    }
}