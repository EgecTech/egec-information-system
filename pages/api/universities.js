import mongoose from "mongoose";
// import University from "../models/university.js";
import { University } from "@/models/University";

// إنشاء جامعة جديدة
export const createUniversity = async (req, res) => {
  try {
    const { name, email, website, phone, location, images, colleges } =
      req.body;

    const newUniversity = new University({
      name,
      email,
      website,
      phone,
      location,
      images,
      colleges,
    });

    const savedUniversity = await newUniversity.save();
    res.status(201).json(savedUniversity);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء الجامعة", error });
  }
};

// الحصول على جميع الجامعات
export const getUniversities = async (req, res) => {
  try {
    const universities = await University.find().populate("colleges.collegeId");
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الجامعات", error });
  }
};

// الحصول على جامعة حسب ID
export const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;
    const university = await University.findById(id).populate(
      "colleges.collegeId"
    );
    if (!university) {
      return res.status(404).json({ message: "الجامعة غير موجودة" });
    }
    res.status(200).json(university);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب بيانات الجامعة", error });
  }
};

// تحديث بيانات جامعة
export const updateUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUniversity = await University.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUniversity) {
      return res.status(404).json({ message: "الجامعة غير موجودة" });
    }
    res.status(200).json(updatedUniversity);
  } catch (error) {
    res.status(500).json({ message: "خطأ في تحديث بيانات الجامعة", error });
  }
};

// حذف جامعة
export const deleteUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUniversity = await University.findByIdAndDelete(id);
    if (!deletedUniversity) {
      return res.status(404).json({ message: "الجامعة غير موجودة" });
    }
    res.status(200).json({ message: "تم حذف الجامعة بنجاح" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في حذف الجامعة", error });
  }
};
