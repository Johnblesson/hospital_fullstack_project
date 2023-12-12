import SampleReceipt from '../models/sampleReceipt.js';
import PBMCSample from '../models/pbmcSample.js';
import HumoralsSampleStorage from '../models/humoralsSampleStorage.js';
import User from '../models/users.js';
import moment from 'moment';
// import { canAccessData } from '../privilege/accessRights.js';
import dotenv from 'dotenv';

dotenv.config();

const createSampleReceipt = async (req, res) => {
  try {
    const {
      studyname,
      subject,
      visitname,
      visitdate,
      ageatvisit,
      samplecollectiondate,
      blooddrawtime,
      samplereceiptdate,
      samplereceipttime,
      hematologysample,
      chemistrysample,
      humoralsample,
      cellularsample,
      comments,
    } = req.body;
    const { id } = req.user.user;

    const newSampleReceiptID = `${subject}_${samplecollectiondate}`;

    const payload = {
      studyname,
      samplereceiptid: newSampleReceiptID,
      subject,
      visitname,
      visitdate,
      ageatvisit,
      samplecollectiondate,
      blooddrawtime,
      samplereceiptdate,
      samplereceipttime,
      hematologysample,
      chemistrysample,
      humoralsample,
      cellularsample,
      comments,
      user_id: id,
    };

    await SampleReceipt.create(payload);

    return res.status(201).json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const getSampleReceipt = async (req, res) => {
  try {
    const { role, id } = req.user.user;
    let whereClause = {};

    if (role !== 'ADMIN') {
      whereClause = { user_id: id };
    }
    const data = await SampleReceipt.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return res.status(201).json({ data: data });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const createPBMCSample = async (req, res) => {
  try {
    const {
      subject,
      visitname,
      sampletype,
      aliquot,
      roomlocation,
      freezernumber,
      boxnumber,
      rownumber,
      columnnumber,
      shipped,
      shippeddate,
      comments,
    } = req.body;
    const { id } = req.user.user;

    const newPBMCSampleID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}-R${rownumber}-C${columnnumber}`;
    const newBoxID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}`;
    const newAliqoutID = `EBL2012-${visitname}-${aliquot}`;
    const newAID = `${subject}-${visitname}-${aliquot}`;

    const payload = {
      pbmcsampletid: newPBMCSampleID,
      boxid: newBoxID,
      aliquotid: newAliqoutID,
      subject,
      visitname,
      sampletype,
      aliquot,
      aid: newAID,
      roomlocation,
      freezernumber,
      boxnumber,
      columnnumber,
      rownumber,
      shipped,
      shippeddate,
      comments,
      user_id: id,
    };
    console.log('payload  ==>', payload);
    const pbmc = await PBMCSample.create(payload);
    console.log('pbmc  ==>', pbmc);

    return res.status(201).json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const getPBMCSample = async (req, res) => {
  try {
    const { role, id } = req.user.user;
    let whereClause = {};

    if (role !== 'ADMIN') {
      whereClause = { user_id: id };
    }

    const data = await PBMCSample.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(201).json({ data: data });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createHumoralsSampleStorage = async (req, res) => {
  try {
    const {
      subject,
      visitname,
      sampletype,
      aliquot,
      roomlocation,
      freezernumber,
      boxnumber,
      rownumber,
      columnnumber,
      shipped,
      shippeddate,
      comments,
    } = req.body;
    const { id } = req.user.user;

    const newHumoralSampleID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}-R${rownumber}-C${columnnumber}`;
    const newBoxID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}`;
    const newAliqoutID = `EBL2012-${visitname}-${aliquot}`;
    const newAID = `${subject}-${visitname}-${aliquot}`;

    const payload = {
      humoralsamplestorageid: newHumoralSampleID,
      boxid: newBoxID,
      aliquotid: newAliqoutID,
      subject,
      visitname,
      sampletype,
      aliquot,
      aid: newAID,
      roomlocation,
      freezernumber,
      boxnumber,
      columnnumber,
      rownumber,
      shipped,
      shippeddate,
      comments,
      user_id: id,
    };
    console.log('payload  ==>', payload);
    const pbmc = await HumoralsSampleStorage.create(payload);
    console.log('pbmc  ==>', pbmc);

    return res.status(201).json({ message: 'OK' });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

const getHumoralsSampleStorage = async (req, res) => {
  try {
    const { role, id } = req.user.user;
    let whereClause = {};

    if (role !== 'ADMIN') {
      whereClause = { user_id: id };
    }

    const humorals = await HumoralsSampleStorage.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.status(201).json({ data: humorals });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export default {
  createSampleReceipt,
  getSampleReceipt,
  createPBMCSample,
  getPBMCSample,
  createHumoralsSampleStorage,
  getHumoralsSampleStorage
};