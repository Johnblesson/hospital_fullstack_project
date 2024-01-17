import CSS from '../models/css_Model.js'; // SampleReceipt
import Ls1Model from '../models/Ls2_Model.js'; // Ls2 PBMCSample
import Ls2Model from '../models/Ls1_Model.js'; // Ls1 HumoralsSampleStorage
import User from '../models/users.js';
// import moment from 'moment';
// import { canAccessData } from '../privilege/accessRights.js';
import dotenv from 'dotenv';

dotenv.config();

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
   const newCss = await CSS.find();
   res.status(200).json({
    status: 'success',
    // results: newsletters.length,
    data: {
        newCss
    }
})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

// Create Ls1 Controller
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

// Get Ls1 Controller
const getLs1 = async (req, res) => {
  try {
   const newLs1 = await Ls1Model.find();
   res.status(200).json({
    status: 'success',
    results: newsletters.length,
    data: {
        newLs1
    }
})
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

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
   const newLs2 = await Ls2Model.find();
   res.status(200).json({
    status: 'success',
    // results: newsletters.length,
    data: {
        newLs2
    }
})
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