import { FieldValue } from "firebase-admin/firestore"; // Firestore specific way to get a timestamp
import db from "./dbConnect.js";

// Database has a collection called tasks, which has documents inside of it
const coll = db.collection("tasks");

export async function getTasks(req, res) {
    const { uid } = req.params;
    // Get all tasks from a given user:
    const tasks = await coll.where('uid', '==', uid).get();
    // maps tasks into an array
    const taskArary = tasks.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(taskArary);
};

export async function addTask(req, res) {
    const {title, uid} = req.body;
    if(!title || !uid) {
        res.status(401).send({ success: false, message: 'Not a valid request'});
        return;
    }
    // Create a document with the following field values in it
    const newTask = {
        title, uid, done: false, 
        createdAt: FieldValue.serverTimestamp()
    };
    await coll.add(newTask);
    res.status(201).send({ success: true, message: 'Item Added'});
}

// Update Tasks
export async function updateTask(req, res){
    const { done, id } = req.body;

    if(!uid) {
        res.status(401).send({success: false, message: "Not a valid reqest"});
        return;
    }

    const updates = {
        done,
        updatedAt: FieldValue.serverTimestamp()
    }

    await coll.doc(id).update(updates);

    res.status(201).send({ success: true, message: "Updated Item"})
}