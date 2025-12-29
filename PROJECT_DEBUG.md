# Project Debug Guide

Agar projectlarni ochishda muammo bo'lsa, quyidagi qadamlarni bajaring:

## 1. API Connection'ni Tekshirish

Browser console'da quyidagi kodni ishga tushiring:

```javascript
// Browser console'da
const testAPI = async () => {
  const response = await fetch('http://localhost:1337/api/projects?populate=*');
  const data = await response.json();
  console.log('Projects:', data);
  console.log('First project:', data.data?.[0]);
};

testAPI();
```

## 2. Strapi Server'ni Tekshirish

Backend'da quyidagi buyruqni ishga tushiring:

```powershell
cd backend
npm run test:api
```

## 3. API Permissions'ni Tekshirish

1. Strapi admin paneliga kiring: `http://localhost:1337/admin`
2. Settings > Users & Permissions Plugin > Roles > Public
3. Project uchun quyidagi permissions'lar yoqilganligini tekshiring:
   - ✅ `find` (GET /api/projects)
   - ✅ `findOne` (GET /api/projects/:id)

## 4. Project Ma'lumotlarini Tekshirish

Browser console'da:

```javascript
// Barcha projectlarni ko'rish
const checkProjects = async () => {
  const { getAllProjects } = await import('/lib/strapi.js');
  const projects = await getAllProjects();
  console.log('All projects:', projects);
  console.log('Projects count:', projects.length);
  projects.forEach((p, i) => {
    console.log(`Project ${i}:`, {
      id: p.id,
      slug: p.slug,
      title: p.title,
      hasImage: !!p.image,
    });
  });
};

checkProjects();
```

## 5. Xatoliklarni Topish

Agar project ochilmasa:

1. Browser console'ni oching (F12)
2. Network tab'ni oching
3. Project page'ga o'ting
4. API request'ni tekshiring:
   - Request URL to'g'rimi?
   - Response status 200mi?
   - Response data mavjudmi?

## 6. Common Issues

### Issue: "Project not found"
**Yechim**: 
- Project slug to'g'rimi?
- Strapi'da project publish qilinganmi?
- API permissions to'g'ri sozlanganmi?

### Issue: "Cannot read property 'title' of undefined"
**Yechim**:
- Project ma'lumotlari to'liqmi?
- Component field'lar mavjudmi?
- LocalizedText component to'g'ri sozlanganmi?

### Issue: "Image not loading"
**Yechim**:
- Image Strapi'da upload qilinganmi?
- Image URL to'g'rimi?
- CORS sozlamalari to'g'rimi?

## 7. Debug Mode

Development mode'da batafsil log'lar ko'rish uchun:

```javascript
// frontend/lib/strapi.js faylida
console.log('Fetching project:', slug);
console.log('API Response:', data);
console.log('Transformed project:', transformed);
```

## 8. Test Script

Test script yaratish:

```javascript
// test-project.js
import { getProject, getAllProjects } from './lib/strapi.js';

async function test() {
  console.log('Testing getAllProjects...');
  const projects = await getAllProjects();
  console.log('Projects:', projects);
  
  if (projects.length > 0) {
    const firstSlug = projects[0].slug;
    console.log('Testing getProject with slug:', firstSlug);
    const project = await getProject(firstSlug, 'RU');
    console.log('Project:', project);
  }
}

test();
```

