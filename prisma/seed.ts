import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const zones = [
  { name: "CABA", fee: 1500 },
  { name: "Zona sur cercana", fee: 2500 },
  { name: "Resto de GBA", fee: 3500 },
];

const categories = [
  { name: "Papas", slug: "papas" },
  { name: "Hamburguesas", slug: "hamburguesas" },
  { name: "Pizzas", slug: "pizzas" },
  { name: "Sánguches de milanesa", slug: "sanguches-de-milanesa" },
  { name: "Empanadas", slug: "empanadas" },
  { name: "Para acompañar", slug: "para-acompanar" },
  { name: "Bebidas", slug: "bebidas" },
  { name: "Postres", slug: "postres" },
];

const products = [
  { category: "papas", slug: "papas-clasicas", name: "Papas clásicas", price: 6500, description: "Bastones dorados y crocantes. La base de todo reino." },
  { category: "papas", slug: "papas-cheddar-panceta", name: "Papas con cheddar y panceta", price: 9800, description: "Bañadas en cheddar caliente y coronadas con panceta crocante." },
  { category: "papas", slug: "papas-bravas", name: "Papas bravas", price: 8200, description: "Con salsa brava picante. Solo para valientes de la corte." },
  { category: "papas", slug: "papas-provenzal", name: "Papas provenzal", price: 7800, description: "Ajo y perejil fresco por encima, como manda la tradición." },
  { category: "papas", slug: "papas-con-huevo", name: "Papas con huevo", price: 8500, description: "Papas fritas con dos huevos fritos de yema líquida." },
  { category: "papas", slug: "papas-gigantes", name: "Papas gigantes del Palacio", price: 12500, description: "La porción real para compartir entre toda la familia." },
  { category: "hamburguesas", slug: "hamburguesa-rey", name: "Hamburguesa Rey", price: 11900, description: "Doble carne, cheddar, lechuga, tomate y la salsa secreta del Palacio." },
  { category: "hamburguesas", slug: "hamburguesa-princesa", name: "Hamburguesa Princesa", price: 9500, description: "Carne simple, cheddar y pickles en pan de papa." },
  { category: "hamburguesas", slug: "hamburguesa-bacon-real", name: "Hamburguesa Bacon Real", price: 12900, description: "Doble carne, panceta ahumada, cheddar y barbacoa." },
  { category: "pizzas", slug: "pizza-muzzarella", name: "Pizza muzzarella", price: 10500, description: "Masa a la piedra, salsa de tomate y muzzarella de verdad." },
  { category: "pizzas", slug: "pizza-napolitana", name: "Pizza napolitana", price: 12500, description: "Muzzarella, rodajas de tomate, ajo y orégano." },
  { category: "pizzas", slug: "pizza-fugazzeta", name: "Pizza fugazzeta", price: 13500, description: "Cebolla caramelizada y doble queso sobre masa esponjosa." },
  { category: "sanguches-de-milanesa", slug: "milanesa-clasica", name: "Sánguche de milanesa clásico", price: 9800, description: "Milanesa de carne con lechuga y tomate en pan francés." },
  { category: "sanguches-de-milanesa", slug: "milanesa-completa", name: "Sánguche de milanesa completo", price: 11500, description: "Con lechuga, tomate, jamón, queso y huevo frito." },
  { category: "sanguches-de-milanesa", slug: "milanesa-napolitana", name: "Sánguche de milanesa napolitano", price: 12200, description: "Salsa de tomate, jamón y queso gratinado." },
  { category: "empanadas", slug: "empanada-carne", name: "Empanada de carne", price: 1900, description: "Carne cortada a cuchillo, cebolla y huevo. Al horno." },
  { category: "empanadas", slug: "empanada-jamon-queso", name: "Empanada de jamón y queso", price: 1800, description: "La que nunca falla, con queso bien fundido." },
  { category: "empanadas", slug: "empanada-pollo", name: "Empanada de pollo", price: 1800, description: "Pollo desmenuzado con morrón y cebolla de verdeo." },
  { category: "empanadas", slug: "empanada-humita", name: "Empanada de humita", price: 1800, description: "Choclo cremoso con salsa blanca." },
  { category: "para-acompanar", slug: "nuggets", name: "Nuggets x8", price: 6200, description: "Pollo crocante por fuera y tierno por dentro." },
  { category: "para-acompanar", slug: "aros-de-cebolla", name: "Aros de cebolla x10", price: 5500, description: "Rebozados en panko, bien dorados." },
  { category: "para-acompanar", slug: "bastones-de-muzzarella", name: "Bastones de muzzarella x6", price: 6900, description: "Queso que estira, con salsa para mojar." },
  { category: "para-acompanar", slug: "salsa-extra", name: "Salsa extra", price: 900, description: "Cheddar, barbacoa o alioli. Elegí la tuya." },
  { category: "bebidas", slug: "gaseosa-500", name: "Gaseosa 500 ml", price: 2800, description: "Cola, lima-limón o naranja, bien fría." },
  { category: "bebidas", slug: "gaseosa-1500", name: "Gaseosa 1,5 L", price: 4800, description: "Para compartir con la corte." },
  { category: "bebidas", slug: "agua-500", name: "Agua mineral 500 ml", price: 2200, description: "Con o sin gas." },
  { category: "bebidas", slug: "cerveza-lata", name: "Cerveza lata 473 ml", price: 3800, description: "Rubia y bien helada." },
  { category: "postres", slug: "helado-dulce-de-leche", name: "Helado de dulce de leche 1/4 kg", price: 5500, description: "Cremoso, con granizado de chocolate." },
  { category: "postres", slug: "flan-casero", name: "Flan casero", price: 4800, description: "Con dulce de leche y crema." },
  { category: "postres", slug: "brownie-con-helado", name: "Brownie con helado", price: 6200, description: "Tibio, húmedo y con una bocha de crema americana." },
  { category: "postres", slug: "churros", name: "Churros x6", price: 5200, description: "Rellenos de dulce de leche y azucarados." },
];

const combos = [
  {
    slug: "combo-rey",
    name: "Combo Rey",
    price: 17900,
    description: "Hamburguesa Rey, papas clásicas y una gaseosa. El menú de los elegidos.",
    items: [
      { product: "hamburguesa-rey", quantity: 1 },
      { product: "papas-clasicas", quantity: 1 },
      { product: "gaseosa-500", quantity: 1 },
    ],
  },
  {
    slug: "combo-corte",
    name: "Combo Corte",
    price: 18900,
    description: "Seis empanadas surtidas, papas clásicas y gaseosa de litro y medio.",
    items: [
      { product: "empanada-carne", quantity: 3 },
      { product: "empanada-jamon-queso", quantity: 3 },
      { product: "papas-clasicas", quantity: 1 },
      { product: "gaseosa-1500", quantity: 1 },
    ],
  },
  {
    slug: "combo-milanesero",
    name: "Combo Milanesero",
    price: 18900,
    description: "Sánguche de milanesa completo, papas bravas y una gaseosa.",
    items: [
      { product: "milanesa-completa", quantity: 1 },
      { product: "papas-bravas", quantity: 1 },
      { product: "gaseosa-500", quantity: 1 },
    ],
  },
  {
    slug: "combo-pizzero",
    name: "Combo Pizzero",
    price: 18500,
    description: "Pizza de muzzarella, bastones de muzzarella y gaseosa de litro y medio.",
    items: [
      { product: "pizza-muzzarella", quantity: 1 },
      { product: "bastones-de-muzzarella", quantity: 1 },
      { product: "gaseosa-1500", quantity: 1 },
    ],
  },
  {
    slug: "combo-familiar",
    name: "Combo Familiar del Palacio",
    price: 38900,
    description: "Dos hamburguesas Rey, papas gigantes, aros de cebolla y gaseosa de litro y medio.",
    items: [
      { product: "hamburguesa-rey", quantity: 2 },
      { product: "papas-gigantes", quantity: 1 },
      { product: "aros-de-cebolla", quantity: 1 },
      { product: "gaseosa-1500", quantity: 1 },
    ],
  },
];

const promotions = [
  {
    title: "Hamburguesas de Realeza",
    description: "20% de descuento en todas las hamburguesas.",
    type: "PERCENTAGE" as const,
    value: 20,
    category: "hamburguesas",
  },
  {
    title: "Aros con 30% off",
    description: "Los aros de cebolla más baratos del reino.",
    type: "PERCENTAGE" as const,
    value: 30,
    product: "aros-de-cebolla",
  },
  {
    title: "Familiar con $4.000 menos",
    description: "Llevate el Combo Familiar con $4.000 de descuento.",
    type: "FIXED" as const,
    value: 4000,
    combo: "combo-familiar",
  },
];

function requireId(ids: Map<string, string>, key: string) {
  const id = ids.get(key);
  if (!id) {
    throw new Error(`Missing seed reference: ${key}`);
  }
  return id;
}

async function main() {
  for (const zone of zones) {
    await prisma.deliveryZone.upsert({
      where: { name: zone.name },
      update: { fee: zone.fee },
      create: zone,
    });
  }

  const categoryIds = new Map<string, string>();
  for (const [index, category] of categories.entries()) {
    const saved = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, sortOrder: index },
      create: { ...category, sortOrder: index },
    });
    categoryIds.set(category.slug, saved.id);
  }

  const productIds = new Map<string, string>();
  for (const product of products) {
    const data = {
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: requireId(categoryIds, product.category),
    };
    const saved = await prisma.product.upsert({
      where: { slug: product.slug },
      update: data,
      create: { slug: product.slug, ...data },
    });
    productIds.set(product.slug, saved.id);
  }

  const comboIds = new Map<string, string>();
  for (const combo of combos) {
    const data = {
      name: combo.name,
      description: combo.description,
      price: combo.price,
    };
    const saved = await prisma.combo.upsert({
      where: { slug: combo.slug },
      update: data,
      create: { slug: combo.slug, ...data },
    });
    comboIds.set(combo.slug, saved.id);

    await prisma.comboItem.deleteMany({ where: { comboId: saved.id } });
    await prisma.comboItem.createMany({
      data: combo.items.map((item) => ({
        comboId: saved.id,
        productId: requireId(productIds, item.product),
        quantity: item.quantity,
      })),
    });
  }

  await prisma.promotion.deleteMany();
  for (const promotion of promotions) {
    await prisma.promotion.create({
      data: {
        title: promotion.title,
        description: promotion.description,
        type: promotion.type,
        value: promotion.value,
        categoryId: promotion.category
          ? requireId(categoryIds, promotion.category)
          : undefined,
        productId: promotion.product
          ? requireId(productIds, promotion.product)
          : undefined,
        comboId: promotion.combo
          ? requireId(comboIds, promotion.combo)
          : undefined,
      },
    });
  }

  const settings = {
    minOrder: 8000,
    prepMinutes: 20,
    deliveryMinutes: 25,
    openDays: [2, 3, 4, 5, 6, 0],
    opensAt: "19:00",
    closesAt: "00:00",
    pickupAddress: "Pompeya 5932, CABA",
    whatsapp: "+541145228878",
    instagram: "@elpalaciodelaspapas.ok",
    transferAlias: "elpalaciodelasp.mp",
    transferHolder: "Pipo Argento",
  };
  await prisma.storeSettings.upsert({
    where: { id: 1 },
    update: settings,
    create: { id: 1, ...settings },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });