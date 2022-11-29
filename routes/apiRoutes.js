const express = require('express');
const uuid = require('uuid');
const members = require('../Members');

const router = express.Router();

// Gets all members
router.get('/', (req, res) => {
    res.json(members);
})

// Get single member
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));

    if (found) {
        res.json(members.filter((member) => member.id === parseInt(id)));
    }
    else {
        res.status(400).json({ msg: 'Member not found' });
    }
})

// Create Member
router.post('/', (req, res) => {
    const { id, name, email, status } = req.body;
    const newMember = {
        id: id ? id : uuid.v4(),
        name,
        email,
        status: status ? status : 'inactive'
    };

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include name and email'})
    }
    
    members.push(newMember);

    // res.json(members);
    res.redirect('/');
})

//  UPDATE MEMBER
router.put('/:id', (req, res) => {
    const paramId = req.params.id;
    const found = members.some(member => member.id === parseInt(paramId));

    if (!found) {
        return res.status(400).json({ msg: 'Cannot update non-existing members'});
    }

    const { name, email, status } = req.body;
    members.forEach(member => {
        if (member.id === parseInt(paramId)) {
            member.id = paramId;
            member.name = name ? name : member.name;
            member.email = email ? email : member.email;
            member.status = status ? status : member.status;

            res.json({ msg: `Member ${paramId} updated`, member });
        }
    });
})

// DELETE member
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const found = members.some(member => member.id === parseInt(id));

    if (found) {
        res.json({ msg: `Member ${id} deleted`, members: members.filter((member) => member.id !== parseInt(id)) });
    }
    else {
        res.status(400).json({ msg: 'Member does not exist' });
    }
})

module.exports = router;