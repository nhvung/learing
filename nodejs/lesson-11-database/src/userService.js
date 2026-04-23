'use strict';

const { PrismaClient } = require('@prisma/client');

// Single shared PrismaClient instance for the whole app
const prisma = new PrismaClient();

async function findAll() {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
}

async function findById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
  return user; // null if not found
}

async function create(data) {
  return prisma.user.create({ data });
}

async function update(id, data) {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch (err) {
    // Prisma error code P2025 = record not found
    if (err.code === 'P2025') return null;
    throw err;
  }
}

async function remove(id) {
  try {
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (err) {
    if (err.code === 'P2025') return false;
    throw err;
  }
}

async function disconnect() {
  await prisma.$disconnect();
}

module.exports = { findAll, findById, create, update, remove, disconnect };
