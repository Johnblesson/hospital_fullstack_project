import CSS from '../models/css_Model.js'; // SampleReceipt
import Ls1Model from '../models/Ls2_Model.js'; // Ls2 PBMCSample
import Ls2Model from '../models/Ls1_Model.js'; // Ls1 HumoralsSampleStorage
import User from '../models/users.js';
// import moment from 'moment';
// import { canAccessData } from '../privilege/accessRights.js';
import dotenv from 'dotenv';

dotenv.config();

// const createCSS = async (req, res) => {
//   try {
//     const {
//       studyName,
//       subject,
//       visitName,
//       visitDate,
//       ageAtVisit,
//       dateSampleCollection,
//       timeOfSampleCollection,
//       dateOfSampleReceipt,
//       timeOfSampleReceipt,
//       comments,
//       dateOfEntry,
//       entryDoneBy
//     } = req.body;
//     const { id } = req.user.user;

//     // const newSampleReceiptID = `${subject}_${samplecollectiondate}`;

//     const payload = {
//       studyName,
//       // samplereceiptid: newSampleReceiptID,
//       subject,
//       visitName,
//       visitDate,
//       ageAtVisit,
//       dateSampleCollection,
//       timeOfSampleCollection,
//       dateOfSampleReceipt,
//       timeOfSampleReceipt,
//       comments,
//       dateOfEntry,
//       entryDoneBy,
//       user_id: id,
//     };

//     await CSS.create(payload);

//     return res.status(201).json({ message: 'OK' });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

// Create Cross-sectional Survey-CSS
const createCSS = async (req, res) => {
  try {
    const newCss = await CSS.create(req.body);
    res.status(201).json({
            status: 'success',
            data: {
                css: newCss
            }
    })

  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}

// Get Cross-sectional Survey-CSS
const getCSS = async (req, res) => {
  try {
    const { role, id } = req.user.user;
    let whereClause = {};

    if (role !== 'ADMIN') {
      whereClause = { user_id: id };
    }
    const data = await CSS.findAll({
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

// Create Ls1 Controller
// const createLs1 = async (req, res) => {
//   try {
//     const {
//       studyName,
//       subject,
//       visitName,
//       visitDate,
//       ageAtVisit,
//       dateSampleCollection,
//       timeOfSampleCollection,
//       dateOfSampleReceipt,
//       timeOfSampleReceipt,
//       comments,
//       dateOfEntry,
//       entryDoneBy
//     } = req.body;
//     const { id } = req.user.user;

//     const newCssSampleID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}-R${rownumber}-C${columnnumber}`;
//     const newBoxID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}`;
//     const newAliqoutID = `EBL2012-${visitname}-${aliquot}`;
//     const newAID = `${subject}-${visitname}-${aliquot}`;

//     const payload = {
//       studyName,
//       subject,
//       visitName,
//       visitDate,
//       ageAtVisit,
//       dateSampleCollection,
//       timeOfSampleCollection,
//       dateOfSampleReceipt,
//       timeOfSampleReceipt,
//       comments,
//       dateOfEntry,
//       entryDoneBy
//     };
//     console.log('payload  ==>', payload);
//     const pbmc = await Ls1Model.create(payload);
//     console.log('pbmc  ==>', pbmc);

//     return res.status(201).json({ message: 'OK' });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

const createLs1= async (req, res) => {
  try {
    const newCss = await Ls1Model.create(req.body);
    res.status(201).json({
            status: 'success',
            data: {
                css: newCss
            }
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}

const getLs1 = async (req, res) => {
  try {
    const { role, id } = req.user.user;
    let whereClause = {};

    if (role !== 'ADMIN') {
      whereClause = { user_id: id };
    }

    const data = await Ls1Model.findAll({
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

// const createLs2 = async (req, res) => {
//   try {
//     const {
//       studyName,
//       subject,
//       visitName,
//       visitDate,
//       ageAtVisit,
//       dateSampleCollection,
//       timeOfSampleCollection,
//       dateOfSampleReceipt,
//       timeOfSampleReceipt,
//       comments,
//       dateOfEntry,
//       entryDoneBy
//     } = req.body;
//     const { id } = req.user.user;

//     const newHumoralSampleID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}-R${rownumber}-C${columnnumber}`;
//     const newBoxID = `EBL2012-${visitname}-${aliquot}-B${boxnumber}`;
//     const newAliqoutID = `EBL2012-${visitname}-${aliquot}`;
//     const newAID = `${subject}-${visitname}-${aliquot}`;

//     const payload = {
//       studyName,
//       subject,
//       visitName,
//       visitDate,
//       ageAtVisit,
//       dateSampleCollection,
//       timeOfSampleCollection,
//       dateOfSampleReceipt,
//       timeOfSampleReceipt,
//       comments,
//       dateOfEntry,
//       entryDoneBy
//     };
//     console.log('payload  ==>', payload);
//     const pbmc = await Ls2Model.create(payload);
//     console.log('pbmc  ==>', pbmc);

//     return res.status(201).json({ message: 'OK' });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

// Create Ls2 Controller
const createLs2 = async (req, res) => {
  try {
    const newCss = await Ls2Model.create(req.body);
    res.status(201).json({
            status: 'success',
            data: {
                css: newCss
            }
    })
  } catch (error) {
    return res.status(500).json({
      message: error,
  });
}
}

const getLs2 = async (req, res) => {
  try {
    const { role, id } = req.user.user;
    let whereClause = {};

    if (role !== 'ADMIN') {
      whereClause = { user_id: id };
    }

    const humorals = await Ls2Model.findAll({
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
  createCSS,
  getCSS,
  createLs1,
  getLs1,
  createLs2,
  getLs2
};