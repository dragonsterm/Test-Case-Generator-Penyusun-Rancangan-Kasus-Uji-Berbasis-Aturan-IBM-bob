'use strict';
const $ = id => document.getElementById(id);
let cases = [];
const desc = $('featureDesc');
desc.addEventListener('input', () => $('descCharCount').textContent = `${desc.value.length} / 1000`);
$('exampleBtn').addEventListener('click', () => { $('featureName').value='Login pengguna'; desc.value='Pengguna masuk menggunakan email dan kata sandi terdaftar. Email wajib berformat valid dan kata sandi minimal 8 karakter.'; $('featureExample').value='Masukkan email dan kata sandi yang benar lalu tekan Masuk.'; desc.dispatchEvent(new Event('input')); });
$('resetBtn').addEventListener('click', () => { $('generatorForm').reset(); cases=[]; $('resultsSection').classList.add('hidden'); $('featureNameError').textContent=''; $('featureDescError').textContent=''; desc.dispatchEvent(new Event('input')); });
$('generatorForm').addEventListener('submit', event => {
 event.preventDefault(); const name=$('featureName').value.trim(), requirement=desc.value.trim();
 $('featureNameError').textContent=name?'':'Nama fitur wajib diisi.'; $('featureDescError').textContent=requirement?'':'Deskripsi kebutuhan wajib diisi.';
 if(!name || !requirement) return;
 const chosen=[...document.querySelectorAll('input[name=tcType]:checked')].map(x=>x.value);
 if(!chosen.length){notify('Pilih setidaknya satu jenis kasus uji.');return;}
 const main=$('featureExample').value.trim() || `Jalankan alur utama ${name} sesuai kebutuhan: ${requirement}`;
 const templates={positive:[['Alur utama berhasil',main,`Fitur ${name} berhasil sesuai kebutuhan yang diberikan.`]],negative:[['Input tidak valid',`Buka ${name}; masukkan data yang tidak valid; kirim.`, 'Sistem menolak input dan memberi pesan yang sesuai.']],validation:[['Input wajib kosong',`Buka ${name}; kosongkan input wajib; kirim.`, 'Sistem meminta input wajib tanpa memproses data.']],boundary:[['Nilai di batas',`Identifikasi batas pada kebutuhan ${name}; uji nilai tepat di batas dan satu unit di luar batas.`, 'Nilai di batas diterima dan nilai di luar batas ditolak sesuai spesifikasi; tentukan batas jika belum disebutkan.']]};
 if(/email/i.test(requirement)) templates.validation.push(['Format email salah',`Buka ${name}; masukkan email tanpa tanda @; kirim.`, 'Sistem menolak format email dan menampilkan pesan validasi.']);
 const match=requirement.match(/(?:minimal|minimum|min)\s*(\d+)/i); if(match) templates.boundary.push(['Panjang minimum',`Uji input terkait dengan ${Number(match[1])-1} dan ${match[1]} karakter.`, `Sesuai aturan minimum ${match[1]} karakter, nilai di bawah batas ditolak dan tepat di batas diterima.`]);
 cases=chosen.flatMap(type=>templates[type].map(row=>[type,...row])).map((row,i)=>[`TC-${String(i+1).padStart(3,'0')}`,{positive:'Positif',negative:'Negatif',validation:'Validasi',boundary:'Batas'}[row[0]],...row.slice(1)]);
 const body=$('testCaseBody'); body.replaceChildren(); cases.forEach(row=>{const tr=document.createElement('tr');row.forEach(cell=>{const td=document.createElement('td');td.textContent=cell;tr.appendChild(td)});body.appendChild(tr)}); $('resultsMeta').textContent=`${cases.length} rancangan untuk ${name}`; $('resultsSection').classList.remove('hidden');
});
function csv(){return [['ID','Jenis','Skenario','Langkah Uji','Hasil yang Diharapkan'],...cases].map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n')}
function notify(message){$('toast').textContent=message;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),3000)}
$('copyBtn').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(csv());notify('Hasil disalin.')}catch{notify('Penyalinan tidak tersedia; gunakan Unduh CSV.')}});
$('downloadBtn').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob(['\ufeff',csv()],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='test-cases.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
